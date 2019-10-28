import { Module, CacheModule } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerSchema } from '../../schemas/customer.schema';
import { UserSchema } from '../../schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pets.service';
import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../shared/services/auth.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secretOrPrivateKey: '54147f5ce0d2',
            signOptions: {
                expiresIn: 3600
            }
        }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema
            },
            {
                name: 'User',
                schema: UserSchema
            }
        ])
    ],
    controllers: [CustomerController,AddressController,PetController,AccountController],
    providers: [AccountService,CustomerService,AddressService,PetService,AuthService,JwtStrategy]
})
export class BackofficeModule { }
