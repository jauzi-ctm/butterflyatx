const userInfoFormFields = [
  { label: "Name", type: "TextInput", required: true, placeholder: "Bob" },
  { label: "Email Address", type: "TextInput", required: true, placeholder: "bob@gmail.com" },
  { type: "Button" }
];

const addEventFormFields = [
  { label: "Event Title", type: "TextInput", required: true, placeholder: "Garage Sale" },
  { label: "Description", type: "TextInput", multiline: true, required: false, placeholder: "Come buy stuff!", default: "No description provided." },
  { label: "Cost", type: "TextInput", required: false, placeholder: "Free", default: "N/A" },
  { label: "Location", type: "TextInput", required: true, placeholder: "123 Street Avenue" },
  { label: "Date", type: "DatePicker", required: true, placeholder: "07/01/2023" },
  { label: "Start Time", type: "TimePicker", required: true, placeholder: "4:00pm" },
  { label: "End Time", type: "TimePicker", required: false, placeholder: "6:00pm", default: "" },
  { label: "userId", type: "hidden" },
  { label: "Users Joined", type: "hidden", default: "1" },
  { type: "Button" }
];
const settingsFields = [
  { label: "Name", type: "TextInput", required: true, placeholder: "john_Doe" },
  { label: "Age", type: "TextInput", multiline: true, required: false, placeholder: "16" },
];
const startPickupGameFormFields = [
  {
    label: 'Sport/Category',
    type: 'SelectList',
    required: true,
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
  { label: 'Date', type: 'DatePicker', required: true, placeholder: '06/21/2023' },
  { label: 'Start Time', type: 'TimePicker', required: true, placeholder: '3:00pm' },
  { label: 'Location', type: 'TextInput', required: true, placeholder: '123 Park Avenue' },
  { label: "userId", type: "hidden" },
  { label: "Users Joined", type: "hidden", default: "1" },
  { type: "Button" }
];

export { userInfoFormFields, addEventFormFields, startPickupGameFormFields, settingsFields };
