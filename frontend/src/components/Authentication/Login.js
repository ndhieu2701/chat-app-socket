import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //set state cho viec nhin thay hay khong nhin thay password
  const [show, setShow] = useState(false);
  // click vao button hien mat khau se thay doi state show
  const handleClick = () => setShow(!show);
  // set state cho cac truong trong form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //loading
  const [loading, setLoading] = useState(false)

  //toast
  const toast = useToast()

  //navigate
  const navigate = useNavigate()

  // submit form
  const submitHandler = async () => {
    setLoading(true);
    // validate
    if (!email || !password ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    //call api
    try {
      const { data } = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      {/* email field  */}
      <FormControl className="email" isRequired mb="6px">
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* password field  */}
      <FormControl className="password" isRequired mb="6px">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* button submit  */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
