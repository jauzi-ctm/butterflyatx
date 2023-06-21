const loginFormFields = [
    { label: "Username" },
    { label: "Password" }
];

const addEventFormFields = [
    {
        label: "Category",
        type: "SelectList",
        options: [
            { value: "Pickup Game" },
            { value: "Individual Event" },
            { value: "Community Event" }
        ]
    },
    { label: "Event Title", type: "TextInput", placeholder: "July 4th Firework Show" },
    { label: "Description", type: "TextInput", placeholder: "Wow!" },
    { label: "Date", type: "TextInput", placeholder: "07/04/2023" },
    { label: "Time", type: "TextInput", placeholder: "09:00pm" },
    { label: "Location", type: "TextInput", placeholder: "Brushy Creek Park" }
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