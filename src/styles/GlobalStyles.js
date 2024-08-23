import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
    padding: 20px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 5px 0;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    &:hover {
      background-color: #0056b3;
    }
  }

  input[type="text"], select {
    padding: 5px;
    margin: 5px 0;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

export default GlobalStyles;
