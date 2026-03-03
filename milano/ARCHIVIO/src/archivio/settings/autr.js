import {FormField} from '../../models'

export default {
    collection: 'autr',
    fields() {
        return [
            new FormField({ name: 'autr', label: 'Riferimento all\'intervento', type: 'text', value: '' }),
        ]
    }
}