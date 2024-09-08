'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './activity-bar.module.scss';
import { Avatar } from '../avatar/avatar';
import { ActivityBarItem } from '@/components/shared';
import { useUser } from '@/hooks/use-user';

export const ActivityBar: React.FC = () => {
  const { user } = useUser();
  const [activeItem, setActiveItem] = useState<string>('orders');

  return (
    <header className={classNames(styles.wrapper)}>
      <Avatar image={
        user?.role === 'admin' ?
        '/avatars/avatar_admin.jpeg' :
        '/avatars/avatar_manager.jpeg'
      }/>

      <div className={classNames(styles.inner)}>
        <ActivityBarItem
          type="orders"
          href="/dashboard/orders"
          active={activeItem === 'orders'}
          onClick={() => setActiveItem('orders')}
        />
        <ActivityBarItem
          type="statistics"
          href="/dashboard/statistics"
          active={activeItem === 'statistics'}
          onClick={() => setActiveItem('statistics')}
        />
      </div>

      <div className={classNames(styles.inner)}>
        {user?.role === 'admin' && (
          <ActivityBarItem
            type="admin"
            href="/dashboard/admin"
            active={activeItem === 'admin'}
            onClick={() => setActiveItem('admin')}
          />
        )}

        <ActivityBarItem
          type="profile"
          href="/dashboard/profile"
          active={activeItem === 'profile'}
          onClick={() => setActiveItem('profile')}
        />
      </div>
    </header>
  );
};
