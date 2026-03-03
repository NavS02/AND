import {FormField} from '../../models'

export default {
    collection: 'autm',
    fields() {
        return [
            new FormField({ name: 'autm', label: 'Tipo', type: 'text', value: '' }),
        ]
    }
}