class API::MealsController < ApplicationController
  def index
    render json: Meal.all, each_serializer: MealSerializer, root: false
  end

  def create
  end

  def update
  end

  def destroy
  end
end
