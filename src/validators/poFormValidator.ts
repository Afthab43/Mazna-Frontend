import { z } from 'zod';

export const poLineItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  purchasePricePaise: z.number().min(0, 'Price must be non-negative'),
  taxPercent: z.number().min(0).max(100).default(18),
});

export const createPoFormSchema = z.object({
  supplierId: z.string().min(1, 'Supplier is required'),
  warehouseId: z.string().min(1, 'Warehouse is required'),
  expectedDeliveryDate: z.string().min(1, 'Expected delivery date is required'),
  shippingMethod: z.string().optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(poLineItemSchema).min(1, 'At least one product line item is required'),
});

export type CreatePoFormInput = z.infer<typeof createPoFormSchema>;
