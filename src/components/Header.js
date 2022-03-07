import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <nav>
          <NavLink
            to="/search"
            activeClassName="active"
            data-testid="link-to-search"
            exact
          >
            BUSCA

          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="active"
            data-testid="link-to-favorites"
          >
            MUSICAS

          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="active"
            data-testid="link-to-profile"
          >
            PERFIL

          </NavLink>
        </nav>

      </header>
    );
  }
}
// faz a renderização condicional com o loading ou o nome

export default Header;
