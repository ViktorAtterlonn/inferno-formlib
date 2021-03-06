'use strict'
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
import { Component } from 'inferno'

import { Adapter } from 'component-registry'

import { interfaces } from 'isomorphic-schema'
import { IInputFieldWidget }  from '../interfaces'

import { Input } from 'inferno-bootstrap'
import { renderString } from './common'
import { generateId } from './utils'

// Placeholder

class CheckboxWidget extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isChecked: props.value
        }

        this.didGetChange = this.didGetChange.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.value !== this.state.isChecked) {
            this.setState({
                isChecked: nextProps.value
            })
        }
    }

    didGetChange (e) {
        this.props.onChange(this.props.propName, this.state.isChecked ? false : true)
    }

    render ({inputName, namespace, options, doesNotRenderLabel, id}) {
        const field = this.props.adapter.context

        const isValid = this.props.validationError || this.props.invariantError ? false : undefined

        const ariaLabels = {
            'aria-invalid': isValid !== undefined,
            'aria-labelledby': doesNotRenderLabel ? undefined : id,
            'aria-label': doesNotRenderLabel ? renderString(field.label || 'inferno-formlib--InputField', options && options.lang, 'Bool Field') : undefined,
            'aria-required': field._isRequired ? field._isRequired : undefined
        }

        return <Input type="checkbox"
            id={generateId(namespace, '__Field')}
            name={inputName}

            {...ariaLabels}

            valid={isValid}
            placeholder={renderString(field.placeholder, options && options.lang)}
            readOnly={field.readOnly}
            checked={this.state.isChecked} // This is a checkbox and it should pass value as checked
            onChange={this.didGetChange} />
    }
}

export default CheckboxWidget

new Adapter({
    implements: IInputFieldWidget,
    adapts: interfaces.IBoolField,
    Component: CheckboxWidget
})
