import { CreateProductEvent, DeleteProductEvent } from "@app/shared";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class ProductEventController {
  @EventPattern(CreateProductEvent.topic)
  async onCreateProduct(@Payload() input: unknown) {
    const payload = CreateProductEvent.parsePayload(input);

    console.log("Product created", payload);
  }

  @EventPattern(DeleteProductEvent.topic)
  async onDeleteProduct(@Payload() input: unknown) {
    const payload = DeleteProductEvent.parsePayload(input);

    console.log("Product deleted", payload);
  }
}
