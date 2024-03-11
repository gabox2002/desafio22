import React, { useState } from "react";
import Button from "./Button";
import Text from "./Text";

function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [age, setAge] = useState("");
    const [welcomMessage, setWelcomMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Estados para indicar la validez de cada campo
    const [fullnameValid, setFullnameValid] = useState(true);
    const [ageValid, setAgeValid] = useState(true);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case "fullname":
                setFullname(value);
                break;
            case "age":
                const cleanedValue = value.replace(/^0+/, "");
                setAge(cleanedValue);
                break;
            default:
                break;
        }
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage({});

        // Validar cada campo y actualizar los estados de validez
        setFullnameValid(validateField("fullname", fullname,"*Nombre completo es requerido."));
        setAgeValid(validateField("age",age,"*La edad debe ser mayor de 13 y menor a 120 años." ));

        // Si hay algún mensaje de error, no continuar con el mensaje de bienvenida
        if (!fullnameValid || !ageValid) {
            return;
        }

        if (fullname.trim() !== "") {
            if (age < 18) {
                setWelcomMessage( `Hola ${fullname}, eres muy joven para usar esta aplicación.`);
            } else {
                setWelcomMessage( `Bienvenido ${fullname}, gracias por usar nuestra aplicación.`);
            }

            setFormSubmitted(true);
        }
    };

    const validateField = (fieldName, value, errorMessage) => {
        // Validar el campo y agregar mensaje de error si es necesario
        const isValid = !!value && (!(fieldName === "age") || (!isNaN(value) && value >= 13 && value <= 120));

        // Actualizar el estado de la validez del campo y restablecer el mensaje de error si es válido
        switch (fieldName) {
            case "fullname":
                setFullnameValid(isValid);
                break;
            case "age":
                setAgeValid(isValid);
                break;
            default:
                break;
        }

        if (!isValid) {
            setErrorMessage((prevErrors) => ({
                ...prevErrors,
                [fieldName]: errorMessage,
            }));
        } else {
            setErrorMessage((prevErrors) => ({
                ...prevErrors,
                [fieldName]: undefined,
            }));
        }

        return isValid;
    };

    const getInputStyle = (fieldName) => {
        const fieldStyles = {
          fullname: { border: !fullnameValid && "1px solid red" },
          age: { border: !ageValid && "1px solid red" },
        };
      
        return fieldStyles[fieldName] || {};
      };

    return (
        <>
            {!formSubmitted ? (
                <form
                    className="form-contact__container"
                    onSubmit={onHandleSubmit}
                >
                    <label htmlFor="fullname">Nombre:</label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={fullname}
                        onChange={handleInputChange}
                        onBlur={() => validateField("fullname", fullname, "*Nombre completo es requerido.")}
                        style={getInputStyle("fullname")}
                    />

                    <label htmlFor="age">Edad:</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={age}
                        onChange={handleInputChange}
                        onBlur={() => validateField("age", age, "*La edad debe ser mayor de 13 y menor a 120 años.")}
                        style={getInputStyle("age")}
                    />

                    <Button
                        label="Enviar"
                        className="btn-submit"
                        type="submit"
                    />
                    <div className="error-container">
                        <Text
                            renderAs="div"
                            componentsProps={{ className: "errorMessage" }}
                            content={Object.keys(errorMessage).map(
                                (fieldName) => (
                                    <p key={fieldName}>
                                        {errorMessage[fieldName]}
                                    </p>
                                )
                            )}
                        />
                    </div>
                </form>
            ) : (
                <Text
                    renderAs="p"
                    componentsProps={{ className: "welcome-message" }}
                    content={welcomMessage}
                />
            )}
        </>
    );
}

export default ContactForm;
