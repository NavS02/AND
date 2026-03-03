import {FormField} from '../../models'

export default {
    collection: 'auts',
    fields() {
        return [
            new FormField({ name: 'auts', label: 'Riferimento all\'autore', type: 'text', value: '' }),
        ]
    }
}