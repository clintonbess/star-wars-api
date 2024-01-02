// Custom ValidationError class extending the Error class
export class ValidationError extends Error {
  constructor(message, details) {
    super(message)
    this.name = 'ValidationError'
    this.details = details
  }
}
// Function to validate fields in data based on field definitions
export function validateFields(data, fieldDefinitions) {
  const errors = []

  // Checks if data is a non-null boject
  if (typeof data !== 'object' || Object.keys(data).length < 1) {
    throw new ValidationError('Validation Error', 'Invalid data type. Expected a non-null object.')
  }

  // Iterate through field definitions to validate each field
  fieldDefinitions.forEach(({ name, type, required }) => {
    if (required === true && !(name in data)) {
      errors.push(`Missing required field: ${name}`)
    }

    // Check type and array validation for non-null fields
    if (name in data && data[name] != null) {
      if (type && type !== 'array' && typeof data[name] !== type) {
        errors.push(`Invalid type for field ${name} expected ${type}`)
      }

      if (type === 'array' && !Array.isArray(data[name])) {
        errors.push(`Invalid type for field ${name}, expected array`)
      }
    }
  })

  // Check for unexpected fields in data
  const dataFields = Object.keys(data)
  const unexpectedFields = dataFields.filter((field) => !fieldDefinitions.some(({ name }) => name === field))
  if (unexpectedFields.length > 0) {
    errors.push(`Unexpected fields: ${unexpectedFields.join(', ')}`)
  }

  // Throw ValidationError if there are any errors
  if (errors.length > 0) {
    throw new ValidationError('Validation Error', errors)
  }
}

// Function to handle ValidationError. Responds with 400 if validation error occurs; 500 otherwise
export const handleValidationError = (error, res) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: error.message,
      details: error.details,
    })
  }
  console.error('Unexpected error:', error)
  res.status(500).json({ error: 'Internal Server Error' })
}

// Function to set all of the requiredFields to false. Used in PATCH methods to verify the fields are correct and also
// allow for partial updates
export function unsetRequiredFields(fieldDefinitions) {
  return fieldDefinitions.map((fieldDef) => ({ ...fieldDef, required: false }))
}
