// @ts-nocheck
export function isAbsent(value) {
  return value === null || value === undefined || value === '';
}


export function validateNotEmptyFields(fieldsToCheck ,req ,res ,type="body") {
  
  let body;

  if(type=='params')
    body=req.params;
  else if (type=='body')
    body=req.body;

      const fieldsMissing=[];

      // Check if any of the specified fields are empty
      for (const field of fieldsToCheck) {
        if (isAbsent(body[field])) {
          fieldsMissing.push(field);
        }
      }
    
    if(fieldsMissing.length !== 0)
    { 
       return { msgcode:100, message: `${fieldsMissing.join(', ')} field/s must have value` };    
    }
    else
       return {};

    }