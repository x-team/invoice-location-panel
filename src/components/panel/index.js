import React from 'react';
import { Card, CardTitle} from 'react-toolbox/lib/card';
import styles from './styles';
import classNames from 'classnames';

export default class XteamerCard extends React.Component {

  static defaultProps = {
    xteamer: {
      hero: {
      }
    }
  };

  state = {
    flipped: false
  }

  flipHero = () => {
    this.setState({flipped: true});
  }

  flipXteamer = () => {
    this.setState({flipped: false});
  }

  render() {

    const {xteamer} = this.props;

    return (
      <div
        className={classNames(styles.wrapper, 'xsdk-component') }
        onMouseEnter={this.flipHero}
        onMouseLeave={this.flipXteamer}>
        <Card className={styles.card}>
          <CardTitle
            avatar={this.state.flipped ? xteamer.hero.avatar : xteamer.avatar}
            title={xteamer.name}
            subtitle={xteamer.specialty}
          />
        </Card>
      </div>
    );
  }
};
