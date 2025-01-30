<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id){
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'condition' => 'required',
            'size' => 'required',
            'defect' => 'required',
            'image' => 'nullable|mimes:jpeg,png,jpg,gif,svg',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        
        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(('images'), $imageName);
        }

        $product = Product::create([
            'title' => $request->input('title'),
            'price' => $request->input('price'),
            'condition' => $request->input('condition'),
            'size' => $request->input('size'),
            'defect' => $request->input('defect'),
            'image' => $imageName
        ]);

        return response()->json([
            'message' => 'Product added successfully',
            'product' => $product,
        ], 201);
    }

    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'price' => 'required|numeric',
        'condition' => 'required',
        'size' => 'required',
        'defect' => 'required',
        'image' => 'nullable|mimes:jpeg,png,jpg,gif,svg',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
    }

    $product = Product::findOrFail($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->title = $request->input('title');
    $product->price = $request->input('price');
    $product->condition = $request->input('condition');
    $product->size = $request->input('size');
    $product->defect = $request->input('defect');

    // Handle the image only if it's provided
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(('images'), $imageName);

        // Optionally, delete the old image file
        if ($product->image && file_exists(('images/' . $product->image))) {
            unlink(('images/' . $product->image));
        }

        $product->image = $imageName;
    }

    $product->save();

    return response()->json([
        'message' => 'Product updated successfully',
        'product' => $product,
    ]);
}


    public function destroy($id){
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
