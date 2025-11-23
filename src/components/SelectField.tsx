import type { ChangeEvent } from 'react'
import type { Option } from '../data/mockData'

interface SelectFieldProps {
    id: string
    label?: string
    value: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    options: Option[]
    required?: boolean
}

const SelectField = ({
                         id,
                         label,
                         value,
                         onChange,
                         options,
                         required = true
                     }: SelectFieldProps) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>
                {label || id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
            <select
                className="form-control"
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            >
                {/*<option value="">Select a category</option>*/}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField