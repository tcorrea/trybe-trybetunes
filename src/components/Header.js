import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handlerUserName();
  }

  handlerUserName = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        userName: name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : <span data-testid="header-user-name">{userName}</span>
        }
      </header>
    );
  }
}

export default Header;
