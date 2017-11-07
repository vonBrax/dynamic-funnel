
 export const bariatric =
 [
    {
        "name": "anthropometry",
        "label": "Anthropometric measurements",
        "headline": "Please choose",
        "questions": [
            {
                "name": "height",
                "type": "slider",
                "validators": ["required"],
                "question": "Height",
                "default": "cm",
                "modifier_class": "height--200",
                "button_toggle": {
                    "name": "height_unit",
                    "type": "button_toggle",
                    "validators": ["required"],
                    "question": "Height unit",
                    "default": "cm",
                    "values": ["cm", "in"]
                }
            },
            {
                "type": "button",
                "subtype": "button",
                "style": "mat-raised-button",
                "color": "primary",
                "value": "NEXT",
                "modifier_class": "matSliderContainer matSliderContainer__button u-justify--center"
            },
            {
                "name": "weight",
                "type": "slider",
                "validators": ["required"],
                "question": "Weight",
                "default": "kg",
                "modifier_class": "height--200",
                "button_toggle":  {
                    "name": "weight_unit",
                    "type": "button_toggle",
                    "validators": ["required"],
                    "question": "Weight Unit",
                    "default": "kg",
                    "values": ["kg", "lb"]
                }
            },
            {
                "name": "bmi",
                "type": "toolbar",
                "validators": null,
                "question": "Your BMI",
                "modifier_class": "full-width"
            }
           
        ]
    },
    {
        "name": "how_long_surgery",
        "type": "radio",
        "validators": ["required"],
        "question": "For how long have you been considering surgery?",
        "answers": [
            "Long enough, I'm ready now",
            "For a while, I'm still researching",
            "Only recently",
            "This is new to me"
        ]
    },
    {
        "name": "how_long_overweight",
        "type": "radio",
        "validators": ["required"],
        "question": "For how long have you been overweight?",
        "answers": [
            "5-10 years",
            "10-20 years",
            "Since childhood",
            "I only gained weight recently"
        ]
    },
    {
        "name": "procedures",
        "type": "radio",
        "validators": ["required"],
        "question": "Which procedures are you open to?",
        "answers": [
            "I am open to any procedure, as long as it is the best option for me",
            "I'm looking for less invasive procedures only",
            "I don't know / Not Sure"
        ]
    },
    {
        "name": "other_methods",
        "type": "radio",
        "validators": ["required"],
        "question": "Which other weight loss methods have you tried?",
        "answers": [
            "Diets and exercise programs",
            "I've used prescribed drugs to lose weight",
            "I've had surgery before",
            "Nothing serious"
        ]
    },
    {
        "name": "discussed_with_doctor",
        "type": "radio",
        "validators": ["required"] ,
        "question": "Have you discussed surgery with your doctor?",
        "answers": [
            "Yes",
            "No"
        ]
    },
    {
        "name": "familial_history",
        "type": "radio",
        "validators": ["required"],
        "question": "Does obesity run in your family?",
        "answers": [
            "Yes",
            "No"
        ]
    },
    {
        "name": "snacker",
        "type": "radio",
        "validators": ["required"],
        "question": "Are you a snacker?",
        "answers": [
            "Yes",
            "No"
        ]
    },
    {
        "name": "volume_eater",
        "type": "radio",
        "validators": ["required"],
        "question": "Are you a volume eater?",
        "answers": [
            "Yes",
            "No"
        ]
    },
    {
        "name": "more_important",
        "type": "radio",
        "validators": ["required"],
        "question": "What is more important to you?",
        "answers": [
            "Leading Specialist for my surgery",
            "Affordable prices",
            "In-depth consultation",
            "Lowest wait time"
        ]
    },
    {
        "name": "comorbidities",
        "type": "select",
        "multiple": true,
        "validators": ["required"],
        "error_message": "Please pick at least one option",
        "question": "Do you have weight-related health issues?",
        "answers": [
            "Diabetes",
            "High blood pressure",
            "Sleep apnea",
            "Osteoarthritis",
            "Others",
            "No"
        ]
    },
    {
        "name": "insurance",
        "type": "radio",
        "validators": ["required"],
        "question": "Does your insurance cover cost for surgery?",
        "answers": [
            "Yes",
            "Partially",
            "No",
            "I don't know"
        ]
    },
    {
        "name": "gender",
        "type": "radio",
        "validators": ["required"],
        "question": "What is your gender?",
        "answers": [
            "Female",
            "Male"
        ]
    },
    {
        "name": "age",
        "type": "radio",
        "validators": ["required"],
        "question": "How old are you?",
        "answers": [
            "Under 18",
            "18-30",
            "31-45",
            "46-65",
            "65 and over"
        ]
    },
    {
        "name": "personal_information",
        "label": "Personal Information",
        "headline": "Please fill in your personal data",
        "questions": [{
                "name": "first_name",
                "type": "text",
                "validators": ["required"],
                "error_message": "Please tell us your first name",
                "question": "First Name",
                "modifier_class": "half-width"
            },
            {
                "name": "last_name",
                "type": "text",
                "validators": ["required"],
                "error_message": "Please tell us your last name",
                "question": "Last Name",
                "modifier_class": "half-width"
            },
            {
                "name": "email",
                "type": "text",
                "subtype": "email",
                "validators": ["required", "email"],
                "error_message": "Please tell us your email",
                "question": "Email",
                "modifier_class": "half-width"
            },
            {
                "name": "phone_number",
                "type": "text",
                "subtype": "tel",
                "validators": ["required"],
                "error_message": "Please tell us your phone number",
                "question": "Phone Number",
                "modifier_class": "half-width"
            },
            {
                "name": "additional_info",
                "type": "textarea",
                "validators": null,
                "question": "Additional Info",
                "hint": "If there's is anything else we should know, please type in this field",
                "modifier_class": "full-width"
            },
            {
                "name": "tos_signoff",
                "type": "checkbox",
                "validators": ["requiredTrue"],
                "question": "I agree to the <a href=\"https://www.qunomedical.com/en/terms-and-conditions\">Terms and Conditions</a> and that Qunomedical may collect, process, use, and disclose my personal information, including my health data, in order to provide a personal and customized service and as further detailed in my <a href=\"https://www.qunomedical.com/en/privacy#consent-declaration\">Consent Declaration</a>.",
                "error_message": "You must accept our terms of service",
            },
            {
                "type": "button",
                "subtype": "submit",
                "style": "mat-raised-button",
                "color": "primary",
                "value": "Get your inquiry now"
            }
        ]
    }
];
