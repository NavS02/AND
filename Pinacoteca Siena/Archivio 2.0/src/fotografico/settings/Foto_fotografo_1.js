import {FormField} from '../../models'

export default {
    collection: 'Foto_fotografo_1',
    fields() {
        return [
           
        ]
    },
    tableFields() {
        return [
            {key:'fotografo_id',label:'Fotografo',sortable: true},
            {key:'Foto_id',label:'Foto',sortable:true},
        ]
    }
}