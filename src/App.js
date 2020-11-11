import { React, useState, useEffect }from "react"
import './style/App.css';
import Form from './components/Form'
import * as yup from "yup"
import schema from './validation/schema'
import axios from "axios";

const initialUserValues = {
  name: "",
  email: "",
  pass: "",
  tos: false
}

const initialUserErrors = {
  name: "",
  email: "",
  pass: "",
  tos: false,
}
const initialUsers = [];
const initialDisabled = true;
function App() {

  const[users, setUsers] = useState(initialUsers)
  const[userValues, setUserValues] = useState(initialUserValues);
  const[userErrors, setUserErrors] = useState(initialUserErrors);
  const[disabled, setDisabled]= useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((fuzz) => {
        console.log(fuzz)
      })
  }

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        console.log(res.data)
        setUserValues(initialUserValues);
      })
      .catch((fuzz) => {
        console.log(fuzz, " you done borked ")
      })
  }

  const change = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setUserErrors({...userErrors, [name]: "",});
      })
      .catch((err) => {
        setUserErrors({...userErrors, [name]: err.errors[0]});
      });
    setUserValues({
      ...userValues,
      [name]: value
    });
    console.log(userValues.tos)
  };

  const submit = () => {
    const newUser = {
      name: userValues.name.trim(),
      email: userValues.email.trim(),
      pass: userValues.pass.trim(),
      tos: userValues.tos,
    }
    postNewUser(newUser);
  }

  useEffect(() => {

    getUsers();

  },[]);

  useEffect(() => {
    schema.isValid(userValues).then((valid) => {
      setDisabled(!valid);
    })
  },[userValues]);

  return (
    <Form values={userValues} change={change} submit={submit} errors={userErrors} disabled={disabled}/>
  );
}

export default App;
