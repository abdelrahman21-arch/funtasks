import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../jwt.config';

/**
 * AuthModule provides JWT configuration and reusable authentication utilities.
 */
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // Replace with config service/env in real app
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
