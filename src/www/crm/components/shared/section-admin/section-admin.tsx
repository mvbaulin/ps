import classNames from 'classnames';
import styles from './section-admin.module.scss';
import { Section } from '@/components/shared';
import { Table } from '@/components/ui/table/table';

interface Props {
  users: any[];
}

export const SectionAdmin: React.FC<Props> = ({users}) => {
  const columns = [
    { label: 'ID' },
    { label: 'Логин' },
    { label: 'Имя' },
    { label: 'Роль' },
    { label: 'Активен' },
    { label: 'Рейтинг' },
    { label: 'Максимум заказов' },
    { label: 'Дата пароля' },
  ];

  const data = users.map((user) => {
    return {
      id: user.id,
      role: user.role,
      login: user.login,
      name: user.name,
      is_active: user.is_active ? 'Да' : 'Нет',
      rate: user.rate.toString(),
      max_orders: user.max_orders,
      password_date: user.password_date ? user.password_date.toISOString() : '',
    };
  });

  return (
    <Section title="Администрирование">
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.inner)}>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Section>
  );
};
