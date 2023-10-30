const getFormsValues=(form: HTMLFormElement)=>{

    //creates a new FormData object using the form element as its argument. 
    //formData variable is a FormData object that collects form data from the event.currentTarget element.
    const formData = new FormData(form as HTMLFormElement)

   
    const values=[...formData.values()]
    //checks if there are empty strings in the table. Return true or false
    const isEmpty= values.includes('')

    //data variable is an object containing the key-value pairs from the form that were previously collected into the formData object.
    const data = Object.fromEntries(formData)

    return {isEmpty, data}
}

export default getFormsValues