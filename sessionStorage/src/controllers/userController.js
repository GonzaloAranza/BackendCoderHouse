import { request, response } from "express";
import UserManager from "../managers/userManager.js";
import bcrypt from 'bcrypt';

export const list = async  (req = request, res = response) =>
{
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
};

export const getOne = async (req = request, res = response) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
};

export const save = async (req = request, res = response) =>
{
  const manager = new UserManager();
  req.body.password = await bcrypt.hash(req.body.password, 10)
  const user = await manager.create(req.body);

  res.send({ status: 'success', user, message: 'User created.' })
};

export const update = async (req = request, res = response) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  const result = await manager.updateOne(id, req.body);

  res.send({ status: 'success', result, message: 'User updated.' })
};

export const deleteOne = async (req = request, res = response) =>
{
  const { id } = req.params;

  const manager = new UserManager();
  await manager.deleteOne(id);

  res.send({ status: 'success', message: 'User deleted.' })
};
