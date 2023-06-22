const userFormFields = [
  { label: "First Name", type: "TextInput", placeholder: "John" },
  { label: "Last Name", type: "TextInput", placeholder: "Doe" },
  { label: "Age", type: "TextInput", placeholder: "22" },
];

const addEventFormFields = [
  { label: "Event Title", type: "TextInput", placeholder: "Garage Sale" },
  { label: "Description", type: "TextInput", placeholder: "Come buy stuff!" },
  { label: "Date", type: "TextInput", placeholder: "07/01/2023" },
  { label: "Time", type: "TextInput", placeholder: "4:00pm" },
  { label: "Location", type: "TextInput", placeholder: "123 Street Avenue" }
];

const startPickupGameFormFields = [
  {
    label: 'Category',
    type: 'SelectList',
    options: [
      { value: 'Frisbee' },
      { value: 'Football' },
      { value: 'Basketball' },
      { value: 'Baseball' },
      { value: 'Chess' },
      { value: 'Tennis' },
      { value: 'Badminton' },
      { value: 'Jogging' },
      { value: 'Swimming' },
      { value: 'Volleyball' },
    ],
  },
  { label: 'Date', type: 'TextInput', placeholder: '06/21/2023' },
  { label: 'Time', type: 'TextInput', placeholder: '3:00pm' },
  { label: 'Location', type: 'TextInput', placeholder: '123 Park Avenue' },
];

export { userFormFields, addEventFormFields, startPickupGameFormFields };
