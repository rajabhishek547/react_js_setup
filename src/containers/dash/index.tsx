import React, { useEffect } from "react";
import { checkUser } from "../../actions/loginActions";
import { connect } from "react-redux";
import CheckRoles from "./checkRoles";

interface Props {
  checkUser: Function;
  user: any;
  path: any;
  query: any;
  
}

const Dash = ({ checkUser, user,path,query }: Props) => {
  
  useEffect(() => {
    
    checkUser();
  }, []);

  console.log(user)
  return (
    <div>
      {user.user ? (
        <CheckRoles role={user.user.user_group} path={path} query={query}/>
      ) : (
        <div style={{ width: "32px", height: "32px" }}>
          Test
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.loginReducer.user,
});
export default connect(mapStateToProps, { checkUser })(Dash);