import { Test, TestingModule } from '@nestjs/testing';
import { ValidationError } from 'class-validator';
import { BuyerRepository } from 'src/repositories/buyer.repository';
import { BuyerService } from 'src/services/buyer.service';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateBuyer } from './create-buyer.use-case';

describe('create-buyer.spec.ts', () => {
  let createBuyer: CreateBuyer;
  let buyerService: BuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBuyer,
        BuyerService,
        {
          provide: BuyerRepository,
          useValue: {
            save: vitest.fn(), // Simula o método save do repositório
          },
        },
      ],
    }).compile();

    createBuyer = module.get<CreateBuyer>(CreateBuyer);
    buyerService = module.get<BuyerService>(BuyerService);
  });

  it('Create a buyer', async () => {
    const buyerCreated = await createBuyer.execute({
      name: 'Natanael Oliveira',
      email: 'natanael@gmail.com',
    });

    const buyer = await buyerService.findById(buyerCreated.id);

    expect(buyer).not.toBeNull();
    expect(buyer.name).toEqual('Natanael Oliveira');
    expect(buyer.email).toEqual('natanael@gmail.com');
  });

  it('Validate empty name field', async () => {
    try {
      await createBuyer.execute({
        name: '',
        email: 'natanael@gmail.com',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('name');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate empty email field', async () => {
    try {
      await createBuyer.execute({
        name: 'Natanel Oliveira',
        email: '',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('email');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate if the email field is to type email', async () => {
    try {
      await createBuyer.execute({
        name: 'Natanel Oliveira',
        email: 'email#@',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('email');
      expect(error[0].constraints).toHaveProperty('isEmail');
    }
  });
});
