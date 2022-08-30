import { Migration } from '@mikro-orm/migrations';

export class Migration20220830024637 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `mikroorms` (`id` int unsigned not null auto_increment primary key, `name` varchar(30) not null, `code` varchar(30) not null, `age` int not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime not null) default character set utf8mb4 engine = InnoDB;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `mikroorms`;');
  }
}
