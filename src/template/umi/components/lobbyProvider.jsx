/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';
import { isBrowser } from 'umi';

import Nav2 from './Nav2';
import GameProvider from './GameProvider';
import Footer0 from './Footer0';

import { Nav20DataSource, Footer00DataSource } from './data.source';
import { ProviderDataSource } from './providerDataSource';
import './less/antMotionStyle.less';
import './less/providerPage.less';
import './less/customStyle.less';

React.useLayoutEffect = React.useEffect;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = isBrowser() ? window : {};

export default class LobbyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port,
      shortName: props.shortname,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    if (location.port) {
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
  }

  render() {
    const children = [
      <Nav2
        id="Nav2_0"
        key="Nav2_0"
        dataSource={Nav20DataSource}
        isMobile={this.state.isMobile}
      />,
      <GameProvider
        id="Conent5_0"
        key="Conent5_0"
        dataSource={ProviderDataSource}
        isMobile={this.state.isMobile}
        shortname={this.state.shortName}
      />,
      <Footer0
        id="Footer0_0"
        key="Footer0_0"
        dataSource={Footer00DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {this.state.show && children}
      </div>
    );
  }
}
