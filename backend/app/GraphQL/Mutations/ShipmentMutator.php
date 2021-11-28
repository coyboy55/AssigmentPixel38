<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ShipmentMutator
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue
     * @param  mixed[]  $args
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context 
     * @return mixed
     */
    public function create($rootValue, array $args, GraphQLContext $context)
    {
        $shipment = new \App\Models\Shipment($args);
        $context->user()->shipment()->save($shipment);

        return $shipment;
    }

    public function delete($rootValue, array $args, GraphQLContext $context)
    {
        $shipment = new \App\Models\Shipment($args);
        $context->user()->shipment()->delete($shipment);

        return $context;
    }

    public function update($rootValue, array $args, GraphQLContext $context)
    {
        $shipment = new \App\Models\Shipment($args);
        $context->user()->shipment()->update($shipment);

        return $context;
    }
   
}