// eslint-disable-next-line no-unused-vars
import { assign } from './utils'

export default models => {
  return (Child = {}) => {
    const modelNames = Object.keys(models)
    const extraProps = ['pending', 'rejected']

    let props
    if (Array.isArray(Child.props)) {
      props = [...Child.props, ...modelNames, ...extraProps]
    } else if (typeof Child.props === 'object') {
      props = {
        ...arrToObj(modelNames.concat(extraProps)),
        ...Child.props
      }
    } else {
      props = modelNames.concat(extraProps)
    }

    return {
      name: Child.name ? `wired-${Child.name}` : 'wired',
      props: Child.props,
      data() {
        return {
          wiredState: {
            pending: {},
            rejected: {},
            ...arrToObj(modelNames)
          }
        }
      },
      created() {
        for (const modelName of modelNames) {
          this.$set(this.wiredState.pending, modelName, true)
          let model = models[modelName]
          if (typeof model === 'function') {
            model = model(this.$props)
          }
          model &&
            model
              .then(value => {
                this.$set(this.wiredState, modelName, value)
                this.$set(this.wiredState.pending, modelName, false)
              })
              .catch(err => {
                this.$set(this.wiredState.rejected, modelName, err)
                this.$set(this.wiredState.pending, modelName, false)
              })
        }
      },
      render(h) {
        const childProps = { ...this.$props, ...this.wiredState }

        return h({ ...Child, props }, { props: childProps })
      }
    }
  }
}

function arrToObj(arr, val = null) {
  return arr.reduce((res, key) => {
    res[key] = val
    return res
  }, {})
}
