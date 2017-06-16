'use strict'
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
import Inferno from 'inferno'
import Component from 'inferno-component'

import { createAdapter, globalRegistry } from 'component-registry'

import { interfaces } from 'isomorphic-schema'
import { IInputFieldWidget }  from '../interfaces'
import classNames from 'classnames'

// Placeholder

// Placeholder

class DynamicSelectFieldWidget extends Component {
    constructor (props) {
        super(props)

        this.didGetChange = this.didGetChange.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    didGetChange (e) {
        const field = this.props.adapter.context
        this.props.onChange(this.props.propName, field.fromString(e.target.value))
    }

    render () {
        const field = this.props.adapter.context

        const options = field.getOptions(this.props.value, this.props.options)

        const cls = {
            "InfernoFormlib-SelectField": true,
            "InfernoFormlib-SelectField--readonly": field.readOnly
        }

        return <select className={classNames(cls)} type="text" readonly={field.readOnly && 'true'} value={this.props.value} 
                    onChange={this.didGetChange}>
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {options.map((item) => <option value={item.name}>{item.title}</option>)}
        </select>
    }
}

export default DynamicSelectFieldWidget

createAdapter({
    implements: IInputFieldWidget,
    adapts: interfaces.IDynamicSelectBaseField,
    Component: DynamicSelectFieldWidget,
}).registerWith(globalRegistry)