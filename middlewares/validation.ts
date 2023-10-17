import { isAbsent } from "../utils/validationUtils.js";

export function validateNotEmptyFields(fieldsToCheck ) {
    return (req, res, next) => {

      const body = req.body;
      let fieldsMissing=[];
 
      if(fieldsToCheck==='All')
         fieldsToCheck=body;
      // Check if any of the specified fields are empty
      for (const field of fieldsToCheck) {
        if (isAbsent(field)) {
          fieldsMissing.push(field);
        }
      }
 
      if(fieldsMissing.length !== 0)
       return res.status(400).json({ msgcode:100, message: `${fieldsMissing.join(', ')} field/s must have value` });

      // If none of the specified fields are empty, proceed to the next middleware
      next();
    };
  } 
  