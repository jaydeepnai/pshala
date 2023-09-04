import React from "react";
import { store } from "../App/store";
import { AddTitle, AddToken, AddUserDetails } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";
import loginRedirect from "./loginRedirect";


const PaymentMethodList = [
  { name: "Check", label: "Check", value: 1 },
  { name: "CreditCardPayment", label: "CreditCardPayment", value: 2 },
  { name: "Zelle", label: "Zelle", value: 3 },
];
var Password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-=[\]{}|;:',.<>/?]).{8,}$/;
var Email = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

function CreateUrl(apiName, paramsObj) {
  var url = process.env.REACT_APP_EventFunctionAppBaseAddress + "api/" + apiName;

  paramsObj?.map((p, i) => {
    if (Object.values(p)[0] !== "" && Object.values(p)[0] != undefined) {
      if (i == 0) {
        url += "?" + Object.keys(p)[0] + "=" + Object.values(p)[0];
      }
      else {
        url += "&" + Object.keys(p)[0] + "=" + Object.values(p)[0];
      }
    }
  });
  return url;
}
const notareactcomponent = () => {
  store.dispatch(AddToken(JSON.parse(localStorage.getItem("tokenModel"))));
};
const onChange = (e, state, setFunction) => {
  e.persist();
  setFunction({ ...state, [e.target.name]: e.target.value });
};
const pageSizeHandeler = (
  state,
  setState,
  setPaginationFocus,
  setPaginateNumber,
  setCurrentPage,
  value
) => {
  setState({ ...state, PageSize: value });
  setPaginationFocus(false);
  setInterval(() => {
    setPaginationFocus(true);
  }, 2000);
  setPaginateNumber(0);
  setCurrentPage(1);
};
const resetInputField = (setState) => {
  setState({ Id: "", Name: "", PhoneEmail: "", UserName: "", cheacked: false });
};
function getTitleTerminology(obj) {
  if (Object.keys(obj.Terminology).length !== 0) {
    obj.Terminology?.map((terminology) => {
      if (terminology.name == obj.moduleName) {
        obj.setTitle(terminology.displayName);
      }
    });
  }
}
function Routing(navigation, Module, Page, ID) {
  navigation(`/${Module}/${Page}`, { state: { ID: ID } });
}
function responseAction(obj) {
  switch (obj.StatusCode) {
    case 401:
      loginRedirect(obj.navigation);
      break;
  }
}

export {
  CreateUrl,
  getTitleTerminology,
  onChange,
  pageSizeHandeler,
  resetInputField,
  Routing,
  responseAction,
  PaymentMethodList,
  Password,
  Email
};
