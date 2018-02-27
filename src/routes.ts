import User from './main/user/User';
import Main from './main/Main';
import UserDept from './main/user/user-dept/UserDept';
import UserUser from './main/user/user-user/UserUser';
import Games from './main/games/Games';
import Dashboard from './main/dashboard/Dashboard';
import Game from './main/games/tic-tac-toe/Game';
import Tetris from './main/games/tetris/Tetris';
import Login from './login/Login';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/main',
    component: Main,
    routes: [
      {
        path: '/main/dashboard',
        component: Dashboard,
        key: 'dashboard',
        title: 'Dashboard',
        exact: true,
      },
      {
        path: '/main/user',
        component: User,
        key: 'user',
        title: 'User',
        routes: [
          {
            path: '/main/user/user',
            component: UserUser,
            key: 'user-management',
            title: 'User Management',
            exact: true,
          },
          {
            path: '/main/user/dept',
            component: UserDept,
            key: 'department',
            title: 'Department',
            exact: true,
          }
        ]
      },
      {
        path: '/main/games',
        component: Games,
        key: 'games',
        title: 'Games',
        routes: [
          {
            path: '/main/games/tic-tac-toe',
            component: Game,
            key: 'tic-tac-toe',
            title: 'Tic-Tac-Toe',
            exact: true,
          },
          {
            path: '/main/games/tetris',
            component: Tetris,
            key: 'tetris',
            title: 'Tetris',
            exact: true,
          }
        ]
      },
    ]
  }
];
export default routes;