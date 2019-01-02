// tslint:disable

export const bariatric: any = [
  {
    "hero_banner": {
      "headline": "Weightloss Treatment in Poland",
      "values": [
        {
          "title": "Weightloss Surgery",
          // "description": "Find the right option for you"
        },
        {
          "title": "5 days stay",
          // "description": "The best doctors pre-selected for you"
        },
        {
          "title": "Pre-op tests & check-ups",
          // "description": "We'll guide you every step of the way"
        },
        {
          "title": "7 week diet plan"
        },
        {
          "title": "Personal driver"
        },
        {
          "title": "All medication"
        }
      ],
      "button_mobile": "Get started",
      "funnel": {
        "name": "anthropometry",
        "type": "form_hero",
        "headline": "Find out which weight loss method is right for you",
        "subtitle": "Please fill in all fields below",
        "button_value": "Get started",
        "questions": [
          {
            "name": "height",
            "type": "text",
            "subtype": "number",
            "validators": null,
            "question": "My height",
            "unit_values": [
              "cm",
              "in"
            ],
            "default_unit": "cm",
            "error_message": "Please tells us your height"
          },
          {
            "name": "weight",
            "type": "text",
            "subtype": "number",
            "validators": null,
            "question": "My weight",
            "unit_values": [
              "kg",
              "lb"
            ],
            "default_unit": "kg",
            "error_message": "Please tell us your weight"
          },
          {
            "name": "target_weight",
            "type": "text",
            "subtype": "number",
            "validators": null,
            "question": "My target weight",
            "unit_values": [
              "kg",
              "lb"
            ],
            "default_unit": "kg",
            "error_message": "Please tell us your target weight",
          }
        ]
      }
    }
  },
  {
    "how_it_works": {
      "values": [
        {
          "title": "FREE PHONE CONSULTATION",
          "text": "Learn everything there is to know about weight loss, our doctors and your options"
        },
        {
          "title": "RECEIVE FREE QUOTE",
          "text": "We'll send you a free, personal quote so you'll know exactly what's included"
        },
        {
          "title": "BOOK, SIT BACK AND RELAX",
          "text": "If you decide to book, your personal health manager will make sure you're well prepared. We will never charge extra for our services"
        }
      ]
    }
  },
  {
    "funnel": {
      "values": [
        {
          "title": "Find out which weight loss method is right for you",
          "text": "Fast, free and confidential."
        }
      ]
    }
  },
  // {
  //   "name": "anthropometry",
  //   "label": "Anthropometric measurements",
  //   "field": "step",
  //   "questions": [
  //     {
  //       "name": "height",
  //       "type": "text",
  //       "subtype": "number",
  //       "validators": [
  //         "required"
  //       ],
  //       "question": "My height",
  //       "unit_values": [
  //         "cm",
  //         "in"
  //       ],
  //       "default_unit": "cm",
  //       "error_message": "Please tells us your height"
  //     },
  //     {
  //       "name": "height_unit",
  //       "type": "select",
  //       "multiple": false,
  //       "validators": [
  //         "required"
  //       ],
  //       "default": "cm",
  //       "answers": [
  //         "cm",
  //         "in"
  //       ]
  //     },
  //     {
  //       "name": "weight",
  //       "type": "text",
  //       "subtype": "number",
  //       "validators": [
  //         "required"
  //       ],
  //       "question": "My weight",
  //       "unit_values": [
  //         "kg",
  //         "lb"
  //       ],
  //       "default_unit": "kg",
  //       "error_message": "Please tell us your weight"
  //     },
  //     {
  //       "name": "weight_unit",
  //       "type": "select",
  //       "multiple": false,
  //       "validators": [
  //         "required"
  //       ],
  //       "default": "kg",
  //       "answers": [
  //         "kg",
  //         "lb"
  //       ]
  //     },
  //     {
  //       "name": "target_weight",
  //       "type": "text",
  //       "subtype": "number",
  //       "validators": [
  //         "required"
  //       ],
  //       "question": "My target weight",
  //       "unit_values": [
  //         "kg",
  //         "lb"
  //       ],
  //       "default_unit": "kg",
  //       "error_message": "Please tell us your target weight"
  //     },
  //     {
  //       "name": "target_weight_unit",
  //       "type": "select",
  //       "multiple": false,
  //       "validators": [
  //         "required"
  //       ],
  //       "default": "kg",
  //       "answers": [
  //         "kg",
  //         "lb"
  //       ]
  //     },
  //     {
  //       "type": "button",
  //       "subtype": "button",
  //       "style": "mat-raised-button",
  //       "color": "primary",
  //       "value": "NEXT",
  //       "modifier_class": "full-width marginTopSmall"
  //     }
  //   ]
  // },



  {
      "field": "step",
      "name": "anthropometry",
      "label": "What is your height and weight?",
      // "question": "Let's get started!",
      // "answers": [],
      // "subtitle": "Please fill in the required fields",
      "button": "CALCULATE BMI",
      "fields": [
        {
          "name": "additional_info_height",
          "type": "number",
          "placeholder": "My height",
          "error_message": "Please tell us your height",
          "validators": [
            "required"
          ]
        },
        {
          "name": "additional_info_height_unit",
          "type": "button-toggle",
          "values": [
            "cm",
            "in"
          ],
          "default": "cm"
        },
        {
          "name": "additional_info_weight",
          "type": "number",
          "placeholder": "My weight",
          "error_message": "Please tell us your weight",
          "validators": [
            "required"
          ]
        },
        {
          "name": "additional_info_weight_unit",
          "type": "button-toggle",
          "values": [
            "kg",
            "lbs"
          ],
          "default": "kg"
        },
        {
          "name": "additional_info_bmi",
          "type": "hidden"
        }
      ]
    },
    {
      "field": "step",
      "name": "disclaimer",
      "label": "Important info",
      "type": "info",
      "validators": ["required"],
      "info": "<span>Your BMI is <strong>%s</strong>.</span>\nA BMI of at least 30-35 is required for bariatric surgery.\nBy letting us know more about your individual situation we can present possible options.",
      "button": "PROCEED"
    },

  {
    "field": "step",
    "name": "treatment",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Which procedures are you looking for?",
    "answers": [
      "Gastric Sleeve",
      "Gastric Bypass",
      "Gastric Band",
      "I'm looking for less invasive procedures only",
      "I'm not sure"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_trying_to_lose_weight_for",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "For how long have you been wanting to lose weight?",
    "answers": [
      "Less than 1 year",
      "2-5 years",
      "Longer than 5 years"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_other_methods",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Which weight loss methods have you tried?",
    "answers": [
      "Diets and exercise programs",
      "I've used prescribed drugs to lose weight",
      "I've had surgery before",
      "Nothing serious"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_discussed_with_doctor",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Have you spoken to a doctor or specialist recently?",
    "answers": [
      "Yes",
      "No"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_snacker",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Are you a snacker?",
    "answers": [
      "Yes",
      "No",
      "Sometimes"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_volume_eater",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Are you a volume eater?",
    "answers": [
      "Yes",
      "No",
      "Sometimes"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_comorbidities",
    "type": "radio",
    "validators": [
      "required"
    ],
    "placeholder": "Please select",
    "question": "Do you have weight-related health issues?",
    "answers": [
      "Yes",
      "No",
      "I'm not sure"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_age",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "How old are you?",
    "answers": [
      "18-25",
      "26-35",
      "36-45",
      "46-55",
      "56 and over"
    ]
  },
  {
    "field": "step",
    "name": "additional_info_country_residency",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Where do you live?",
    "answers": [
      "United Kingdom",
      "Ireland",
      "USA",
      "Other",
    ]
  },
  {
    "field": "step",
    "name": "additional_info_travel_willingness",
    "type": "radio",
    "validators": [
      "required"
    ],
    "question": "Would you be open to travelling abroad for treatment?",
    "answers": [
      "Yes",
      "No"
    ]
  },
  {
    "field": "step",
    "name": "personal_information",
    "label": "Personal Information",
    "headline": "Please fill in your personal data",
    "questions": [
      {
        "name": "first_name",
        "type": "text",
        "validators": [
          "required"
        ],
        "question": "First Name",
        "error_message": "Please tell us your first name",
        "modifier_class": "half-width"
      },
      {
        "name": "last_name",
        "type": "text",
        "validators": [
          "required"
        ],
        "question": "Last Name",
        "error_message": "Please tell us your last name",
        "modifier_class": "half-width"
      },
      {
        "name": "email",
        "type": "text",
        "subtype": "email",
        "validators": [
          "required",
          "email"
        ],
        "question": "Email",
        "error_message": "Please tell us your email",
        "error_message_email": "Please enter a valid email address",
        "modifier_class": "full-width"
      },
      {
        "name": "phone_number",
        "type": "phone",
        "validators": [
          "required"
        ],
        "question": "Phone Number",
        "error_message": "Please tell us your phone number",
        "country_label": "Country",
        "country_error": "Please tell us your country",
        "modifier_class": "full-width"
      },
      {
        "name": "additional_info_notes",
        "type": "textarea",
        "validators": null,
        "question": "Additional Info",
        "hint": "If there's is anything else we should know, please type in this field",
        "modifier_class": "full-width"
      },
      {
        "name": "tos_signoff",
        "type": "checkbox",
        "validators": [
          "requiredTrue"
        ],
        "question": "I agree to Qunomedical's <a href='https://www.qunomedical.com/en/terms-and-conditions' target='_blank' rel='noopener'>Terms and Conditions</a>, I have read the <a href='https://www.qunomedical.com/en/privacy' target='_blank' rel='noopener'>Privacy Policy</a> and I agree that my given details including health data may be processed by Qunomedical for the purpose of obtaining quotes. This includes the transfer of my data to healthcare providers within and outside the EU. The consent can be <a href='https://www.qunomedical.com/en/imprint' target='_blank' rel='noopener'>revoked</a> at any time with effect for the future.",
        "error_message": "You must accept our terms of service"
      },
      {
        "type": "button",
        "subtype": "submit",
        "style": "mat-raised-button",
        "color": "primary",
        "value": "Find out now"
      }
    ]
  },
  {
    "footer": {
      "terms": "<a href='https://www.qunomedical.com/en/terms-and-conditions' target='_blank'>Terms and Conditions</a>",
      "privacy": "<a href='https://www.qunomedical.com/en/privacy' target='_blank'>Privacy Policy</a>",
      "rights": "All rights reserved"
    }
  }
];
