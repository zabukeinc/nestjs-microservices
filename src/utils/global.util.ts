import { UserAddressModel } from 'src/modules/user-address/data/models/user-address.model';
import { UserAddressService } from 'src/modules/user-address/data/services/user-address.service';
import { UserAddressOrchestrator } from 'src/modules/user-address/domain/usecases/user-address.orchestrator';
import { UserAddressController } from 'src/modules/user-address/infrastructure/controllers/user-address.controller';
import { UserPinModel } from 'src/modules/user/data/models/user-pin.model';
import { UserModel } from 'src/modules/user/data/models/user.model';
import { UserService } from 'src/modules/user/data/services/user.service';
import { UserOrchestrator } from 'src/modules/user/domain/usecases/user.orchestrator';
import { TestConsumer } from 'src/modules/user/infrastructure/consumers/test.consumer';
import { UserController } from 'src/modules/user/infrastructure/controllers/user.controller';
import { UserProducer } from 'src/modules/user/infrastructure/producers/user.producer';

export const MODELS = [UserModel, UserPinModel, UserAddressModel];

export const PROVIDERS = [
  UserService,
  UserOrchestrator,
  UserAddressOrchestrator,
  UserAddressService,
  UserProducer,
];

export const CONTROLLERS = [
  UserController,
  UserAddressController,
  TestConsumer,
];
