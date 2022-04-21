export const theme = {
    global: {
        colors: {
            brand: '#561c09',
            'accent-1': '#313238'
        },
        font: {
            family: 'Roboto',
            size: '22px',
            height: '20px',
        },
        hover: {
            background: {
                color: '#brand',
            }
        }
    },
    select: {
        background: {
            color: '#F7F2D5',
        },
    },
    table:{
        body:{
            pad:{
                "horizontal": "8px",
                "vertical": "8px"
            }
        },
        header: {
            pad:{
                "horizontal": "8px",
                "vertical": "8px"
            }
        }
    },
    box:{
        extend: {
            
        }
    },
    checkBox: {
        color: 'accent-1',
    },
    pagination: {
        button: {
            active: {
                background: {
                    color: 'accent-1'
                }
            }
        }
    },
    formField: {
        border: {
            color: 'transparent'
        },
        focus: {
            border: {
                color: 'transparent'
            }
        },
        margin:{
            left: "xsmall",
            right: "xsmall"
        }
    },
    spinner: {
        container: {
            color: 'accent-1'
        }
    },
    backgroundColor: '#F7F2D5',
    accentColor: '#561c09',
    textColor: '#313238',

    disabledColor: '#890d0d',
    enabledColor: '#42890d',
}

export default theme