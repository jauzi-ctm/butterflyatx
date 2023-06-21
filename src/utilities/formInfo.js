const loginFormFields = [
    { label: "Username" },
    { label: "Password" }
];

const addEventFormFields = [
    { label: "Event Title", placeholder: "July 4th Firework Show" },
    { label: "Description", placeholder: "Wow!" },
    { label: "Date", placeholder: "07/04/2023" },
    { label: "Time", placeholder: "09:00pm" },
    { label: "Location", placeholder: "Brushy Creek Park" }
];

const startPickupGameFormFields = [
    {
        label: "Category",
        type: "SelectList",
        options: [
            { value: "Frisbee" },
            { value: "Football" },
            { value: "Basketball" },
            { value: "Baseball" },
            { value: "Chess" },
            { value: "Tennis" },
            { value: "Badminton" },
            { value: "Jogging" },
            { value: "Swimming" },
            { value: "Volleyball" }
        ]
    },
    { label: "Date", type: "TextInput", placeholder: "06/21/2023" },
    { label: "Time", type: "TextInput", placeholder: "3:00pm" },
    { label: "Location", type: "TextInput", placeholder: "123 Park Avenue" }
]

export { loginFormFields, addEventFormFields, startPickupGameFormFields };