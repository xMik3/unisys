import {useState, useContext} from "react";
import type {SubmitEvent, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import {ApiError} from "../api/apiClient";
import type {UserType} from "../types/models";

export function Login(){
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [userID, setUserID] = useState("");
  const [userPWD, setUserPWD] = useState("");
  const [userType, setUserType] = useState<UserType>("Student");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!auth){
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try{
      let id = userID;
      if (userType === "Secretary"){
        id = "000000";
      }

      await auth.login(id, userPWD, userType);

      switch (userType){
        case "Student": {
          navigate("/student");
          break;
        }

        case "Teacher": {
          navigate("/teacher");
          break;
        }

        case "Secretary": {
          navigate("/secretary");
          break;
        }
      }
      
    }catch(err){
      let message = "Something went wrong. Please try again.";
      if (err instanceof ApiError){
        message = err.message;
      }
      setError(message);
    }finally{
      setIsSubmitting(false);
    }
  }

  let idField: ReactNode = null;
  if(userType !== "Secretary"){
    idField = (
      <div>
        <label htmlFor="userID">ID</label>
        <input id="userID" value={userID} onChange={(event) => setUserID(event.target.value)} />
      </div>
    );
  }

  let errorText: ReactNode = null;
  if (error) {
    errorText = <p>{error}</p>;
  }

  let buttonLabel = "Log in";
  if (isSubmitting) {
    buttonLabel = "Logging in...";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>

      <div>
        <label htmlFor="userType">Role</label>
        <select id="userType" value={userType} onChange={(event) => setUserType(event.target.value as UserType)}>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Secretary">Secretary</option>
        </select>
      </div>

      {idField}

      <div>
        <label htmlFor="userPWD">Password</label>
        <input id="userPWD" type="password" value={userPWD} onChange={(event) => setUserPWD(event.target.value)} />
      </div>

      {errorText}

      <button type="submit" disabled={isSubmitting}>
        {buttonLabel}
      </button>
    </form>
  );
}
