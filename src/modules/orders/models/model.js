export default {
  pipedriveId: {
    type: Number,
    required: true
  },
  blingId: {
    type: Number,
    required: true
  },
  orderNumber: {
    type: String,
    trim: true
  },
  client: {
    id: {
      type: Number
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    }
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  products: [ {
    id: {
      type: Number
    },
    name: {
      type: String,
      trim: true
    },
    unit: {
      type: String,
      trim: true
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    }
  } ]
}
