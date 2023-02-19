import {Body, Controller, Header, Param, Post, Req} from "@nestjs/common";
import {ThresholdService} from "./app.service";
import {Threshold} from "./thresholds.dto";

@Controller('thresholds')
export class ThresholdController {
    constructor(private readonly appService: ThresholdService) {}

    @Post([
        '/crypto/add',
        '/shares/add'
    ])
    @Header('content-type', 'application/json')
    async add_treshold(
        @Req() req: Request,
        @Body() msg: Threshold
    ) {
        await this.appService.add_thresholds(msg);
    }

    @Post([
        "/crypto/:source/get",
        '/shares/:source/get'
    ])
    @Header('content-type', 'application/json')
    async get_tresholds(
        @Req() req: Request,
        @Param() params: { source: string }
    ) {
        return JSON.parse(await this.appService.get_thresholds(params.source));
    }
}