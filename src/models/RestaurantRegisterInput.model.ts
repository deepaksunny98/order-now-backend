import { ApiModelProperty } from '@nestjs/swagger';

export class RestaurantRegisterInput {
@ApiModelProperty()
Email: string;

@ApiModelProperty()
Password: string;
}
