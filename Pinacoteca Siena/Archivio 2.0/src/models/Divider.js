import FormField from "./FormField";

/**
 * provide a structure for fields used in a form
 */
export default class extends FormField {
    special=false
    constructor(params) {
        super(params)
    if (params?.special) this.special = params.special;

    }


}