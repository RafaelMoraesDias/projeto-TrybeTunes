import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }
  // definido o estado inicial do componente header

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }
  // assim que montar o componente busca a informação
  // da função getuser de forma assincrona, e atualiza o estado

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (<h3 data-testid="header-user-name">{ user }</h3>
          )}
      </header>
    );
  }
}
// faz a renderização condicional com o loading ou o nome

export default Header;
