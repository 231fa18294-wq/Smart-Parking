const { body, validationResult } = require('express-validator');

const validateBooking = [
  body('slotNumber')
    .trim()
    .notEmpty()
    .withMessage('Slot number is required'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['2-wheeler', '3-wheeler', '4-wheeler'])
    .withMessage('Invalid vehicle type'),
  
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 1, max: 24 })
    .withMessage('Duration must be between 1 and 24 hours'),
  
  body('cost')
    .notEmpty()
    .withMessage('Cost is required')
    .isFloat({ min: 0 })
    .withMessage('Cost must be a positive number'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateBooking,
  validate,
};
