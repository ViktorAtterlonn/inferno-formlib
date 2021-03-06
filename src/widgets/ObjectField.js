'use strict'
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
import { Adapter } from 'component-registry'

import { Component } from 'inferno'

import { interfaces } from 'isomorphic-schema'
import { IInputFieldWidget }  from '../interfaces'
import { generateId } from './utils'
import { renderRows } from './ObjectFieldHelpers'

export default class ObjectFieldWidget extends Component {

  constructor (props) {
    super(props)

    this.didUpdate = this.didUpdate.bind(this)
    this.didInput = this.didInput.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // Because this is a container we set isMounted here instead of getting it from parent
    this.isMounted = true
  }

  didInput (propName, data) {
    const value = this.props.value || {}
    value[propName] = data
    this.props.onInput && this.props.onInput(this.props.propName, value)
  }

  didUpdate (propName, data) {
    const value = this.props.value || {}
    value[propName] = data
    this.props.onChange(this.props.propName, value)
  }

  render() {
    const field = this.props.adapter.context
    return <div id={generateId(this.props.namespace, '__Field')} className="InfernoFormlib-ObjectField">
        {renderRows({
          schema: field.schema,
          namespace: this.props.namespace || [],
          inputName: this.props.inputName,
          value: this.props.value,
          selectFields: (typeof this.props.selectFields === 'string' ? this.props.selectFields.split(',').map((k) => k.trim()) : this.props.selectFields),
          omitFields: (typeof this.props.omitFields === 'string' ? this.props.omitFields.split(',').map((k) => k.trim()) : this.props.omitFields),
          lang: this.props.options && this.props.options.lang,

          validationErrors: this.props.validationError,
          isMounted: this.isMounted,
          customWidgets: this.props.customWidgets,
          onInput: this.didInput,
          onChange: this.didUpdate
        })}
    </div>
  }
}

new Adapter({
    implements: IInputFieldWidget,
    adapts: interfaces.IObjectField,
    Component: ObjectFieldWidget,
})
