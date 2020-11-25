import React from 'react';
import classnames from 'classnames';
import { autobind } from 'core-decorators';
import Item from './item.jsx';
import './index.scss';
import { getScrollTop, getWindowHeight} from '../../../utils';

@autobind
class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuBodyVisible: false,
      isFixed : false
    };
  }

  componentDidMount() {
    let menu = document.getElementById("menu");
    let pos = parseInt(menu.offsetTop + 200);
    let docBody = document.getElementById("doc-body");
    let a = document.documentElement.scrollHeight;
    let high = getWindowHeight();
    console.log(high + a);
    console.log(a);

    window.addEventListener("scroll", () => {
      let scrollY = getScrollTop();
      if (scrollY >= pos) {
        this.setState({
            isFixed: true,
        });
        docBody.setAttribute("style", "margin-left:295px");
        console.log('start')
      } else if (scrollY < pos) {
        this.setState({isFixed: false});
        docBody.setAttribute("style", "");
        console.log('stop')
      }

      if (scrollY  + high >= a) {
        menu.setAttribute("style", "position:absolute;bottom:337px");
      } else {
        menu.setAttribute("style", "");
      }
    })
  }

  toggleMenuBody() {
    this.setState({
      menuBodyVisible: !this.state.menuBodyVisible,
    });
  }

  render() {
    const { dataSource } = this.props;
    const { menuBodyVisible, isFixed } = this.state;
    const cls = classnames({
      sidemenu: true,
      fixed: isFixed,
      'sidemenu-open': menuBodyVisible,
    });
    const itemCls = classnames({
      'menu-item': true,
      'menu-item-level-1': true,
    });

    return  (<div className={cls} id="menu">
          <div onClick={this.toggleMenuBody} className="sidemenu-toggle">
            <img src={menuBodyVisible ? 'https://img.alicdn.com/tfs/TB1I5itXQyWBuNjy0FpXXassXXa-200-200.png' : 'https://img.alicdn.com/tfs/TB1E6apXHGYBuNjy0FoXXciBFXa-200-200.png'} />
          </div>
          <ul>
          {
            dataSource.map((data, i) => {
              return (
                <li className={itemCls} key={i}>
                  <span>
                  {data.title}
                  </span>
                  <ul>
                    {data.children.map((item, j) => <Item item={item} key={j} toggleMenuBody={this.toggleMenuBody} />)}
                  </ul>
                </li>
              );
            })
          }
          </ul>
        </div>);
  }
}

export default SideMenu;
