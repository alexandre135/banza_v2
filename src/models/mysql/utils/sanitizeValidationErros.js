function sanitizeValidationErrors(error){
    
    let sanitized = []

    error.errors.map(item => {
        const msg = item.message.split(": ")
        sanitized.push(msg[0])
    })
   
   return sanitized
}

module.exports = sanitizeValidationErrors